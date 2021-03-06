<?php
/**
 * Athene2 - Advanced Learning Resources Manager
 *
 * @author    Aeneas Rekkas (aeneas.rekkas@serlo.org)
 * @license   http://www.apache.org/licenses/LICENSE-2.0  Apache License 2.0
 * @link      https://github.com/serlo-org/athene2 for the canonical source repository
 * @copyright Copyright (c) 2013-2014 Gesellschaft für freie Bildung e.V. (http://www.open-education.eu/)
 */
namespace CacheInvalidator\Invalidator;

use Zend\Cache\Storage\FlushableInterface;
use Zend\Cache\Storage\StorageInterface;
use Zend\EventManager\Event;

class StrokerStorageInvalidator implements InvalidatorInterface
{
    /**
     * @var StorageInterface
     */
    protected $storage;


    /**
     * @param StorageInterface $storage
     */
    public function __construct(StorageInterface $storage)
    {
        $this->storage = $storage;
    }

    /**
     * @param Event  $e
     * @param string $class
     * @param string $event
     * @return void
     */
    public function invalidate(Event $e, $class, $event)
    {
        if ($this->storage instanceof FlushableInterface) {
            $this->storage->flush();
        }
    }
}
